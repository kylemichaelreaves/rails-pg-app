module Api
  module V1
    class MemosController < ApplicationController
      before_action :set_memo, only: %i[show update destroy]

      # GET /api/v1/memos
      def index
        @memos = Memo.includes(:budget_category).all

        # Apply limit if provided
        if params[:limit].present?
          @memos = @memos.limit(params[:limit].to_i)
        end

        # Apply offset if provided
        if params[:offset].present?
          @memos = @memos.offset(params[:offset].to_i)
        end

        render json: @memos.as_json(
          include: {
            budget_category: { only: %i[id name] }
          },
          methods: %i[total_amount_debit total_amount_credit total_transactions]
        )
      end

      # GET /api/v1/memos/:id
      def show
        render json: @memo.as_json(
          include: {
            budget_category: { only: %i[id name] },
            transactions: { only: %i[id date description amount_debit amount_credit] }
          },
          methods: %i[total_amount_debit total_amount_credit total_transactions]
        )
      end

      # GET /api/v1/memos/summary
      def summary
        @memos = Memo.includes(:budget_category).all
        summary_data = @memos.map do |memo|
          {
            id: memo.id,
            name: memo.name,
            budget_category: memo.budget_category&.name,
            total_debit: memo.total_amount_debit,
            total_credit: memo.total_amount_credit,
            transaction_count: memo.total_transactions
          }
        end
        render json: summary_data
      end

      # POST /api/v1/memos
      def create
        @memo = Memo.new(memo_params)

        if @memo.save
          render json: @memo, status: :created
        else
          render json: { errors: @memo.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/memos/:id
      def update
        if @memo.update(memo_params)
          render json: @memo, status: :ok
        else
          render json: { errors: @memo.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/memos/:id
      def destroy
        @memo.destroy
        head :no_content
      end

      private

      def set_memo
        @memo = Memo.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Memo not found' }, status: :not_found
      end

      def memo_params
        params.require(:memo).permit(:name, :budget_category_id)
      end
    end
  end
end
