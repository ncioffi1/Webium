class Api::UsersController < ApplicationController
  require "open-uri"

  wrap_parameters include: User.attribute_names + ['password']

  def index
    @users = User.all
    # render json: @articles
    render :index
  end 

  def create
    @user = User.new(user_params)

    @user.photo.attach(
      io: URI.open("https://webium-seeds.s3.amazonaws.com/demo.jpg"), 
      filename: "demo.jpg"
    )

    if @user.save
      login!(@user)
      render :show
      # render json: {user: @user}
    else 
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:email, :name, :password, :photo)
  end
end
