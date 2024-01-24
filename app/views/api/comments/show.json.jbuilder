json.comment do
    json.extract! @comment, :id, :user_id, :commentbody, :article_id, :parent_comment_id, :created_at, :updated_at
end

json.claps do
    json.array! @comment.claps do |clap|
        json.extract! clap, :id, :user_id, :article_id, :comment_id, :created_at, :updated_at
    end
end