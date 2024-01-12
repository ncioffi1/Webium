class Api::SessionsController < ApplicationController

  def show
    #   * `show`
    #   * if there is a `current_user`: render `current_user` as JSON, under a
    #     top-level key of `user`
    #   * if there is not a `current_user`: render `{ user: nil }` as JSON
    @user = current_user
    # if @user
    #   @user = User.new()
    # end

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
    # * `create`
    #   * pass the credentials from the request body, stored under top level keys of
    #     `credential` and `password`, to `User::find_by_credentials`; save the result
    #     to `@user`
    #   * if a user with matching credentials was found (i.e., `@user` is truthy):
    #     * login `@user`
    #     * render `@user` as JSON, under a top-level key of `user`
    #   * if no user was found (i.e., `@user` is falsey):
    #     * render `{ errors: ['The provided credentials were invalid.'] }` as JSON,
    #       with a status of `:unauthorized`

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
