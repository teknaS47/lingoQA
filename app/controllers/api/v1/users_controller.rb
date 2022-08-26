module Api
    module V1
        class UsersController < ApplicationController
            def new
                user = User.new
            end
    
            def create
                newuser = User.find_by(name: params[:name])
                newemail = User.find_by(email: params[:email])

                if newemail == nil
                    if newuser == nil
                        user = User.new(user_params)
                        user.save! 
                    else
                        render json: {error: "Please choose another username. Username already taken"}
                    end
                else
                    render json: {error: "This email id already exists. Please login."}
                end
            rescue ActiveRecord::RecordInvalid => invalid
                render json: { errors: invalid.record.errors }
                # render json: { errors: "Please choose another username. Username already taken" }
            end

            def index
                if params.has_key?(:name)
                    @user = User.find_by(name: params[:name])                    
                    if @user == nil
                        render json: {error: "Please enter valid username and password or Sign up for a new account"}
                    elsif @user.authenticate(params[:password])
                        activity = {"user_id": @user.id, "login_time": Time.now.in_time_zone("Chennai")}
                        @usert = UserActivity.new(activity)
                        @usert.save!
                        userData={"name": @user[:name], "admin": @user[:admin], "login_time": activity[:login_time]}
                        render json: userData
                    else
                        render json: {error: "Wrong username or password"}
                    end
                end
                
            end

            def forgot
                @user = User.find_by(email: (params[:email]).downcase)

                if @user != nil
                    if @user.update(password: params[:password])
                        render json: "Password changed sucessfully"
                    else
                        render json: "Password NOT changed"
                    end
                else
                    render json: "User does not exist"
                end
            end

            def logout
                @user = User.find_by(name: params[:name])
                @usert = UserActivity.find_by("user_id": @user.id, "login_time": user_params[:login_time])
                @usert.update("logout_time": Time.now.in_time_zone("Chennai"))
            end

            def user_params
                params.permit(:name, :email, :password, :login_time)
            end
        end
    end 
end
