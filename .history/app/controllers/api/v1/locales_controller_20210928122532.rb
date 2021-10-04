# frozen_string_literal: true

module Api
  module V1
    # Controller methods for locales model
    class LocalesController < ApplicationController
      def index
        @locales = Locale.all
        render json: @locales
      end

      def new
        locale = Locale.new
      end

      def create
        locale = Locale.new(locale_name_params)
        locale.save!
        rescue ActiveRecord::RecordInvalid => invalid
          render json: { errors: invalid.record.errors }
      end

      def locale_name_params
        params.permit(:name)
      end
      
    end
  end
end
