json.article do
    json.extract! @article, :id, :user_id, :title, :content, :date_posted, :created_at, :updated_at
end