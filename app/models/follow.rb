# == Schema Information
#
# Table name: follows
#
#  id           :bigint           not null, primary key
#  following_id :integer
#  follower_id  :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Follow < ApplicationRecord
    belongs_to :following,
        primary_key: :id,
        foreign_key: :following_id,
        class_name: :User

    belongs_to :follower,
        primary_key: :id,
        foreign_key: :follower_id,
        class_name: :User

end
