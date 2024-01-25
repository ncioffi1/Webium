json.article do
    json.extract! @article, :id, :user_id, :title, :content, :date_posted, :created_at, :updated_at

    json.photoUrl @article.photo.attached? ? @article.photo.url : nil
end

json.author do
    json.extract! @article.user, :id, :name, :email

    json.photoUrl @article.user.photo.attached? ? @article.user.photo.url : nil
end

json.claps do
    json.array! @article.claps do |clap|
        json.extract! clap, :id, :user_id, :article_id, :comment_id, :created_at, :updated_at
    end
end

json.comments do
    json.array! @article.comments do |comment|
        json.extract! comment, :id, :user_id, :commentbody, :article_id, :parent_comment_id, :created_at, :updated_at
    end
end




