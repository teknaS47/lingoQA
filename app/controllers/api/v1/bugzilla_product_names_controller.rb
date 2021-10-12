# frozen_string_literal: true

module Api
  module V1
    # Controller methods for bugzilla_product_names model
    class BugzillaProductNamesController < ApplicationController
      before_action :version

      def index
        @bugzilla_product_names = BugzillaProductName.all
        if params.has_key?(:id)
          @bugzilla_product_id = @version.bugzilla_product_names_id
          if @bugzilla_product_id == nil
            render json: ""
          else
            @bn = BugzillaProductName.find_by(id: @bugzilla_product_id)
            @bugzilla_product_name = @bn.name
            render json: @bugzilla_product_name
          end
        else
          render json: @bugzilla_product_names
        end

        def show
          if params.has_key?(:id)
            @bugzilla_product_names = BugzillaProductName.all

            @bugzilla_product_id = @version.bugzilla_product_names_id
            if @bugzilla_product_id == nil
              render json: ""
            else
              @bn = BugzillaProductName.find_by(id: @bugzilla_product_id)
              @bugzilla_product_name = @bn.name
              render json: @bugzilla_product_name
            end
          else
            render json: @bugzilla_product_names
          end
        end
      end

      def new
        bugzillaName = BugzillaProductName.new
      end

      def create
        bugzillaName = BugzillaProductName.new(bugzilla_product_name_params)
        bugzillaName.save!
      rescue ActiveRecord::RecordInvalid => invalid
        render json: { errors: invalid.record.errors }
      end

      def bugzilla_product_name_params
        params.permit(:name)
      end

      private

      def version
        if params.has_key?(:id)
          @version = ProductVersion.find(params[:id])
        end
      end
    end
  end
end
