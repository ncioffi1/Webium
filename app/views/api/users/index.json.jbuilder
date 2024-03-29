json.users do
    json.array! @users do |user|
        json.extract! user, :id, :email, :name, :created_at, :updated_at

        json.photoUrl user.photo.attached? ? user.photo.url : nil
    end
end