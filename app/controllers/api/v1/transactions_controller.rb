# frozen_string_literal: true
module Api
  module V1
    # Transactions Controller
    class TransactionsController < ApplicationController
      before_action :set_transaction, only: %i[show]

      def days
        render json: Transaction.distinct_days
      end

      def weeks
        render json: Transaction.distinct_weeks
      end

      def months
        render json: Transaction.distinct_months
      end

      def years
        render json: Transaction.distinct_years
      end

      def index
        result = TransactionQuery.new(params, paginate).call

        render json: format_response(result)
      end

      def frequency_summary
        result = FrequencySummaryQuery.new(params[:frequency]).call
        render json: result
      rescue ArgumentError => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      def timeframe_summary
        result = TimeframeSummaryQuery.new(
          date: params[:date],
          time_frame: params[:timeframe].singularize # Convert "months" to "month"
        ).call

        render json: result
      end

      def show
        @transaction = Transaction.find(params[:id])
        if @transaction
          render json: @transaction.as_json(include: %i[memo budget_category])
        else
          render json: @transaction.errors
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_transaction
        @transaction = Transaction.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def transaction_params
        params.require(:transaction).permit(
          :transaction_number,
          :date,
          :description,
          :amount_debit,
          :amount_credit,
          :fees,
          :balance,
          :check_number,
          :memo_id)
      end

      def format_response(result)
        case result
        when Array, Hash
          # Aggregation results, counts, or special queries
          result
        when ActiveRecord::Result
          # Raw SQL results (like budget category hierarchy)
          result.to_a
        else
          # ActiveRecord relation
          result.as_json(include: {
            memo: { only: %i[id name budget_category recurring necessary] },
            budget_category: { only: %i[id name] }
          })
        end
      end

    end
  end
end

