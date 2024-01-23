json.comment do
    json.extract! @comment, :id, :user_id, :comment, :article_id, :parent_comment_id, :created_at, :updated_at
end