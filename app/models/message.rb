class Message < ApplicationRecord
  belongs_to :group
  belong_to :user

  validates :content, presence: true, unless: :image?
end
