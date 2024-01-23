json.claps do
    json.array! @claps do |clap|
        json.extract! clap, :id, :user_id, :article_id, :comment_id, :created_at, :updated_at
    end
end