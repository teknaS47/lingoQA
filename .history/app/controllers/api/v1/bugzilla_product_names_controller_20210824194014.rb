# frozen_string_literal: true

module Api
    module V1
      # Controller methods for bugzilla_product_names model
      class BugzillaProductNamesController < ApplicationController
        before_action :version
        def index

          @bugzilla_product_id = @version.bugzilla_product_names_id
          if @bugzilla_product_id == nil
                
            render json: @bugzilla_product_id
    else
    @bn = BugzillaProductName.find_by(id:@bugzilla_product_id)
    @bugzilla_product_name = @bn.name
    render json: @bugzilla_product_name
    end
        end

        def show
            
            @bugzilla_product_id = @version.bugzilla_product_names_id
            if @bugzilla_product_id == nil
                
                    render json: @bugzilla_product_id
            else
            @bn = BugzillaProductName.find_by(id:@bugzilla_product_id)
            @bugzilla_product_name = @bn.name
            render json: @bugzilla_product_name
            end
            
        end

      private
      def version
        @version = ProductVersion.find(params[:id]) 
      end

      end
    end
  end
  