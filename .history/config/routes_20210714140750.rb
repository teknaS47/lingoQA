# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace 'api' do
    namespace 'v1' do
      resources :locales, only: [:index]
      resources :screenshots,  only: [:index, :new, :create]
      resources :products , only: [:index] do
        resources :product_versions, only: [:index]
      end
      resources :product_versions,  only: [:index] do
        resources :screenshots,  only: [:index, :new, :create]
      end
    end
  end
end
