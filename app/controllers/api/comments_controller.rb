class Api::CommentsController < ApplicationController
    def index
        @comments = Comment.all
        # render json: @articles
        render :index
    end

    def show
        @comment = Comment.find_by(id: params[:id])
        render :show
    end

    def create
        @comment = Comment.new(comment_params)

        # @comment.user_id = current_user.id
        # @article.date_posted = Time.now.strftime("%d/%m/%Y")

        if @comment.save
            puts @comment
            puts "TESTING!!!"
            render :show
        else  
            render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @comment = Comment.find(params[:id])

        if (@comment.update(comment_params))
            render :show
        else
            render json: @comment.errors.full_messages,
            status: 422
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        @comment.destroy
        
        render json: {message: 'success'}
    end

    private
    def comment_params
        params.require(:comment).permit(:commentbody, :user_id, :article_id, :parent_comment_id)
    end
end
