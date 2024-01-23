class Api::ClapsController < ApplicationController
    def index
        @claps = Clap.all
        # render json: @articles
        render :index
    end

    def show
        @clap = Clap.find_by(id: params[:id])
        render :show
    end

    def create
        @clap = Clap.new(clap_params)

        # @comment.user_id = current_user.id
        # @article.date_posted = Time.now.strftime("%d/%m/%Y")

        if @clap.save
            # puts @clap
            # puts "TESTING!!!"
            render :show
        else  
            render json: { errors: @clap.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @clap = Comment.find(params[:id])
        @clap.destroy
        
        render json: {message: 'success'}
    end

    private
    def clap_params
        params.require(:clap).permit(:user_id, :article_id, :comment_id)
    end

end
