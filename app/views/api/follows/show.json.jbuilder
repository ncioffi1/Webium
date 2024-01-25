json.follow do
    json.extract! @follow, :id, :following_id, :follower_id, :created_at, :updated_at
end