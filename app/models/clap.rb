# == Schema Information
#
# Table name: claps
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  article_id :integer
#  comment_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Clap < ApplicationRecord

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :article,
        primary_key: :id,
        foreign_key: :article_id,
        class_name: :Article

    belongs_to :comment,
        primary_key: :id,
        foreign_key: :comment_id,
        class_name: :Comment
end
