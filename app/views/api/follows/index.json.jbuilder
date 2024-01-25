json.follows do
    json.array! @follows do |follow|
        json.extract! follow, :id, :follower_id, :following_id, :created_at, :updated_at
    end
end