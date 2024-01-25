class Api::FollowsController < ApplicationController
    def index
        @follows = Follow.all
        render :index
    end

    def show
        @follow = Follow.find_by(id: params[:id])
        render :show
    end

    def create
        @follow = Follow.new(follow_params)

        if @follow.save
            render :show
        else  
            render json: { errors: @follow.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @follow = Comment.find(params[:id])
        @follow.destroy
        
        render json: {message: 'success'}
    end

    private
    def clap_params
        params.require(:follow).permit(:following_id, :follower_id)
    end



end