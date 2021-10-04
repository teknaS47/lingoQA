# frozen_string_literal: true

module Api
  module V1
    # Controller methods for locales model
    class LocalesController < ApplicationController
      def index
        @locales = Locale.all
        render json: @locales
      end
    end
  end
end
