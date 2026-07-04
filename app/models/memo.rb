class Memo < ApplicationRecord
  belongs_to :user
  has_many :transactions, dependent: :nullify

  validates :recurring, inclusion: { in: [true, false] }
  # Mirrors the DB `recurring_frequency_check`: a frequency exists iff recurring.
  validate :frequency_matches_recurring

  private

  def frequency_matches_recurring
    if recurring && frequency.blank?
      errors.add(:frequency, 'must be present when recurring')
    elsif !recurring && frequency.present?
      errors.add(:frequency, 'must be blank when not recurring')
    end
  end
end
