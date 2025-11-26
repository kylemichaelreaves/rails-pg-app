# frozen_string_literal: true

# Utility module for consistent console logging throughout the application
module ConsoleLogger
  # ANSI color codes
  COLORS = {
    black: "\e[30m",
    red: "\e[31m",
    green: "\e[32m",
    yellow: "\e[33m",
    blue: "\e[34m",
    magenta: "\e[35m",
    cyan: "\e[36m",
    white: "\e[37m",
    light_black: "\e[90m",
    light_red: "\e[91m",
    light_green: "\e[92m",
    light_yellow: "\e[93m",
    light_blue: "\e[94m",
    light_magenta: "\e[95m",
    light_cyan: "\e[96m",
    light_white: "\e[97m",
    reset: "\e[0m",
    bold: "\e[1m",
    dim: "\e[2m",
    italic: "\e[3m",
    underline: "\e[4m"
  }.freeze

  class << self
    # Colorize text with ANSI codes
    # @param text [String] The text to colorize
    # @param color [Symbol] The color name (from COLORS hash)
    # @param styles [Array<Symbol>] Additional styles (bold, underline, etc.)
    # @return [String] The colorized text
    def colorize(text, color = nil, *styles)
      return text unless color_supported?

      codes = []
      codes << COLORS[color] if color && COLORS.key?(color)
      styles.each { |style| codes << COLORS[style] if COLORS.key?(style) }

      return text if codes.empty?

      "#{codes.join}#{text}#{COLORS[:reset]}"
    end

    # Check if terminal supports colors
    def color_supported?
      return @color_supported if defined?(@color_supported)

      @color_supported = $stdout.tty? && ENV['TERM'] != 'dumb'
    end

    # Disable color support (useful for tests or piped output)
    def disable_colors!
      @color_supported = false
    end

    # Enable color support
    def enable_colors!
      @color_supported = true
    end

    # Print a section header with title
    # @param title [String] The title to display
    # @param width [Integer] Width of the separator line (default: 60)
    # @param color [Symbol] Optional color for the header
    def print_header(title, width: 60, color: :cyan)
      separator = '=' * width
      puts "\n#{colorize(separator, color)}"
      puts colorize(title.upcase, color, :bold)
      puts colorize(separator, color)
    end

    # Print a section footer
    # @param width [Integer] Width of the separator line (default: 60)
    # @param color [Symbol] Optional color for the footer
    def print_footer(width: 60, color: :cyan)
      puts colorize('=' * width, color)
      puts "\n"
    end

    # Print a success message with checkmark
    # @param message [String] The success message to display
    def success(message)
      puts "#{colorize('✅', :green)} #{colorize(message, :green)}"
    end

    # Print a warning message
    # @param message [String] The warning message to display
    def warning(message)
      puts "#{colorize('⚠️', :yellow)}  #{colorize(message, :yellow)}"
    end

    # Print an error message
    # @param message [String] The error message to display
    def error(message)
      puts "#{colorize('❌', :red)} #{colorize(message, :red)}"
    end

    # Print an info message
    # @param message [String] The info message to display
    # @param color [Symbol] Optional color for the message
    def info(message, color: nil)
      puts color ? colorize(message, color) : message
    end

    # Print a summary section
    # @param title [String] The summary title
    # @param items [Hash] Key-value pairs to display
    # @param color [Symbol] Optional color for the summary
    def print_summary(title = 'Summary', items = {}, color: :blue)
      summary_icon = colorize('📊', color)
      summary_title = colorize(title, color, :bold)
      puts "\n#{summary_icon} #{summary_title}:"
      items.each do |key, value|
        puts "  #{colorize(key.to_s, :light_black)}: #{value}"
      end
    end

    # Execute a block with automatic header and footer
    # @param title [String] The section title
    # @param width [Integer] Width of the separator line
    # @param color [Symbol] Optional color for the section
    # @yield The block to execute
    def section(title, width: 60, color: :cyan)
      print_header(title, width: width, color: color)
      result = yield if block_given?
      print_footer(width: width, color: color)
      result
    end
  end
end

