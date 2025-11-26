#!/usr/bin/env ruby
# Demo script to showcase ConsoleLogger color capabilities

require_relative 'config/environment'

puts "\n#{'=' * 60}"
puts 'CONSOLELOGGER COLOR DEMO'
puts '=' * 60

ConsoleLogger::COLORS.each_key do |color_name|
  next if %i[reset bold dim italic underline].include?(color_name)

  puts ConsoleLogger.colorize("  #{color_name}", color_name)
end

# Demo 7: Color control
puts "\n7. Color Control:"
ConsoleLogger.info("Colors are #{ConsoleLogger.color_supported? ? 'SUPPORTED' : 'NOT SUPPORTED'}")

ConsoleLogger.disable_colors!
ConsoleLogger.info("After disable_colors!: #{ConsoleLogger.colorize('This text is not colored', :red)}")

ConsoleLogger.enable_colors!
ConsoleLogger.info("After enable_colors!: #{ConsoleLogger.colorize('This text is RED', :red)}")

# Demo 8: All available colors
puts "\n8. All Available Colors:"
ConsoleLogger::COLORS.each_key do |color_name|
  next if %i[reset bold dim italic underline].include?(color_name)

  puts ConsoleLogger.colorize("  #{color_name}", color_name)
end

puts "\n#{'=' * 60}"
puts 'END OF DEMO'
puts "#{'=' * 60}\n"

