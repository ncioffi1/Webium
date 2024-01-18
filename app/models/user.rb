# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  name            :string           not null
#  email           :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  session_token   :string           not null
#  password_digest :string           not null
#
class User < ApplicationRecord
    has_secure_password

    validates :name, :email, presence: true, uniqueness: true
    validates :name, length: { in: 3..40 }
    validates :name, format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }
    validates :email, length: { in: 3..100 }
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..40 }, allow_nil: true

    before_validation :ensure_session_token

    has_many :articles,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Article,
        dependent: :destroy

    has_many :followers, 
        primary_key: :id,
        foreign_key: :following_id,
        class_name: :Follow,
        dependent: :destroy

    has_many :following, 
        primary_key: :id,
        foreign_key: :follower_id,
        class_name: :Follow,
        dependent: :destroy

    has_many :comments,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Comment,
        dependent: :destroy

    has_many :claps,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Clap,
        dependent: :destroy

    # private
    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def generate_unique_session_token
        while true
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        session_token
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        if user && user.authenticate(password)
            return user
        else
            nil
        end
    end
end
