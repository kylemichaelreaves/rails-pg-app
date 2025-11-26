# frozen_string_literal: true

# app/queries/transaction_query.rb
class TransactionQuery
  def initialize(params, pagination_proc = nil)
    @params = params
    @pagination_proc = pagination_proc
  end

  def call
    return aggregate_result if aggregation_query?
    return count_result if count_query?

    standard_query
  end

  private

  attr_reader :params, :pagination_proc

  def aggregation_query?
    params[:total_amount_debit] == 'true'
  end

  def count_query?
    params[:count].present?
  end

  def aggregate_result
    result = Transaction
               .joins(:memo)
               .then { |scope| apply_filters(scope) }
               .sum(:amount_debit)

    [{ total_amount_debit: result }]
  end

  def count_result
    if params[:budget_category_summary].present?
      Transaction
        .joins(:memo)
        .where.not(memos: { budget_category: nil })
        .distinct
        .count('memos.budget_category')
    else
      apply_filters(Transaction.all).count
    end
  end

  def standard_query
    Transaction
      .includes(:memo, :budget_category)
      .then { |scope| apply_filters(scope) }
      .order(date: :desc)
      .then { |scope| apply_pagination(scope) }
  end

  def apply_filters(scope)
    scope = apply_timeframe_filter(scope)
    scope = apply_budget_category_filter(scope)
    scope = apply_memo_filter(scope)
    scope
  end

  def apply_timeframe_filter(scope)
    return scope unless params[:time_frame].present? && params[:date].present?

    timeframe_data = TimeframeService.calculate(params[:time_frame], params[:date])

    scope.where(date: timeframe_data[:start_date]..timeframe_data[:end_date])
  rescue ArgumentError
    scope
  end

  def apply_budget_category_filter(scope)
    return scope unless params[:budget_category].present?

    scope.joins(:memo).where(memos: { budget_category: params[:budget_category].strip })
  end

  def apply_memo_filter(scope)
    if params[:memo_id].present?
      scope.where(memo_id: params[:memo_id])
    elsif params[:memo_name].present?
      scope.joins(:memo).where(memos: { name: params[:memo_name].strip })
    else
      scope
    end
  end

  def apply_pagination(scope)
    return scope unless pagination_proc

    pagination_proc.call(scope)
  end
end