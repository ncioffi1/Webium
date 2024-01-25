json.user do
    json.extract! @user, :id, :email, :name, :created_at, :updated_at

    json.photoUrl @user.photo.attached? ? @user.photo.url : nil
end

json.followers do
    json.array! @user.followers do |follow|
        json.extract! follow, :id, :follower_id, :following_id, :created_at, :updated_at
    end
end

json.following do
    json.array! @user.following do |follow|
        json.extract! follow, :id, :follower_id, :following_id, :created_at, :updated_at
    end
end



