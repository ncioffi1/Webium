class ApplicationController < ActionController::API
    include ActionController::RequestForgeryProtection

    protect_from_forgery with: :exception

    before_action :attach_authenticity_token

    # def test
    #     if params.has_key?(:login)
    #       login!(User.first)
    #     elsif params.has_key?(:logout)
    #       logout!
    #     end
      
    #     if current_user
    #       render json: { user: current_user.slice('id', 'name', 'session_token') }
    #     else
    #       render json: ['No current user']
    #     end
    # end

    def current_user 
        @current_user = User.find_by(session_token: session[:session_token])
    end

    def require_logged_in
        if !logged_in?
            render json: {errors: ['must be logged in']}, status: 401
        end
    end

    def require_logged_out
        if logged_in?
            render json: {errors: ['must be logged out']}, status: 403
        end
    end

    def logged_in?
        !!current_user
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
        @current_user = user

    end

    def logout!
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    private
    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
    end
end
