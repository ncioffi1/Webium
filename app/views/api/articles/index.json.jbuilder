# json.articles do
    

# end

json.articles do
    json.array! @articles do |article|
        json.extract! article, :id, :user_id, :title, :content, :date_posted, :created_at, :updated_at

        json.photoUrl article.photo.attached? ? article.photo.url : nil
    end
end


# json.article do
#     @articles.each do |article|
#         
#     end
# end