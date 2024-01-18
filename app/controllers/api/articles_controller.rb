class Api::ArticlesController < ApplicationController
    # GET /api/articles/ - should return a list of all of our articles. can tap into this data to show certain articles to a user
    # GET /api/articles/:id - returns an article. used for populating data on an article's page. when a user clicks to read an article, they will use this path.
    # POST /api/articles - creates a new article for a given user.
    # PATCH /api/articles/:id - allows a user to edit/update their existing article.
    # DELETE /api/articles/:id - allows a user to delete their article.

    def index
        @articles = Article.all
        render json: @articles
    end

    def show
        @article = Article.find_by(id: params[:id])
        render :show
    end

    def create
        @article = Article.new(article_params)
        @article.user_id = current_user.id
        @article.date_posted = Time.now.strftime("%d/%m/%Y")

        if @article.save
            render :show
        else  
            render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @article = Article.find(params[:id])

        if (@article.update(article_params))
            render :show
        else
            render json: @article.errors.full_messages,
            status: 422
        end
    end

    def destroy
        @article = Article.find(params[:id])
        @article.destroy
        
        render json: {message: 'success'}
    end

    private
    def article_params
        params.require(:article).permit(:title, :content)
    end
end
