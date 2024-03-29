# == Schema Information
#
# Table name: articles
#
#  id          :bigint           not null, primary key
#  user_id     :integer          not null
#  title       :string           not null
#  content     :text             not null
#  date_posted :date             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Article < ApplicationRecord
    validates :title, length: {minimum: 1}
    validates :content, length: {minimum: 1}

    has_one_attached :photo
    
    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User

    has_many :comments,
        primary_key: :id,
        foreign_key: :article_id,
        class_name: :Comment,
        dependent: :destroy

    has_many :claps,
        primary_key: :id,
        foreign_key: :article_id,
        class_name: :Clap,
        dependent: :destroy
end
