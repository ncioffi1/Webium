# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  name            :string           not null
#  email           :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  password_digest :string
#  session_token   :string
#
class User < ApplicationRecord
    validates :name, :email, presence: true

    has_many :articles,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User

    has_many :followers, 
        primary_key: :id,
        foreign_key: :following_id,
        class_name: :Follow

    has_many :following, 
        primary_key: :id,
        foreign_key: :follower_id,
        class_name: :Follow

    has_many :comments,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Comment

    has_many :claps,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Clap
end
