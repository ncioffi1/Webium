# == Schema Information
#
# Table name: comments
#
#  id                :bigint           not null, primary key
#  user_id           :integer          not null
#  commentbody       :text             not null
#  article_id        :integer          not null
#  parent_comment_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class Comment < ApplicationRecord
    validates :user_id, :commentbody, :article_id, presence: true

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :article,
        primary_key: :id,
        foreign_key: :article_id,
        class_name: :Article

    belongs_to :parent_comment, optional: true,
        primary_key: :id,
        foreign_key: :parent_comment_id,
        class_name: :Comment

    has_many :replies,
        primary_key: :id,
        foreign_key: :parent_comment_id,
        class_name: :Comment,
        dependent: :destroy

    has_many :claps,
        primary_key: :id,
        foreign_key: :comment_id,
        class_name: :Clap,
        dependent: :destroy
end
