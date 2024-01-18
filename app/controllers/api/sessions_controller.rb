class Api::SessionsController < ApplicationController

  def show
    @user = current_user

    if logged_in?
      if @user
        render 'api/users/show'
      else 
        render json: { user: nil }
      end
      # render json: { user: current_user }
    else 
      # render "api/users/show"
      if @user
        render 'api/users/show'
      else 
        render json: { user: nil }
      end
      # render json: { user: nil }
    end

  end

  def create
    email = params[:email]
    password = params[:password]

    @user = User.find_by_credentials(email, password)

    if @user
      login!(@user)
      render 'api/users/show'
      # render json: {user: @user}
    else 
      render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
    end
  end

  def destroy
    # * `destroy`
    #   * log out the `current_user`, if one exists
    #   * render `{ message: 'success' }` as JSON
    if logged_in?
      logout!
      render json: {message: 'success'}
    end
  end
end
