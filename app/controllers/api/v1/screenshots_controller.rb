# frozen_string_literal: true
require "fileutils"
require "rtesseract"
require "rmagick"
require "open-uri"
require "base64"

module Api
  module V1
    # Controller methods to call a service of AWS S3
    class ScreenshotsController < ApplicationController
      before_action :product_version, :locale, except: :destroy

      def index
        screenshots = Screenshot.where(product_version_id: @version, locale_id: @locale)
        screenshot = screenshots.map { |screenshots|
          screenshots.as_json.merge(images: screenshots.images.map { |image| url_for(image) })

        }
        if (params.has_key?("indexnumber"))
          a = params["indexnumber"].to_i

          screenshots = Screenshot.where(product_version_id: @version, locale_id: @locale)
          screenshot = screenshots.map { |screenshots|
            screenshots.as_json.merge(images: screenshots.images.map { |image| image })
          }
          s=screenshot[0][:images][a]
          l=screenshot[0][:images].length

          puts "############################################### #{a+1}"

          image_url = (s).service_url

          image_path = image_url
          image = Magick::ImageList.new
          image = Magick::Image.read(image_path).first
          imagere = image.resize(4)
          imagere.write "imagere.png"
          imagegray = image.resize(4)
          imagegray.colorspace = Magick::LinearGRAYColorspace
          imageth = imagegray.unsharp_mask(radius = 6.8, sigma = 1.0, amount = 2.69, threshold = 0.0)
          imageth.write "grey.png"
          image3 = RTesseract.new("grey.png", lang: "eng")
          string = image3.to_s
          box = image3.to_box

          ignore = ["Red", "Hat", "RED", "HAT", "ENTERPRISE", "LINUX", "KDUMP", "GiB"]

          for x in box
            if ignore.exclude?(x[:word])
              if x[:confidence] >= 85
                x_start = x[:x_start] - 10
                y_start = x[:y_start] - 10
                x_end = x[:x_end] + 10
                y_end = x[:y_end] + 10
                puts x
                gc = Magick::Draw.new
                gc.stroke = "red"
                gc.stroke_width = 3
                gc.fill = "none"
                gc.rectangle x_start, y_start, x_end, y_end
                gc.draw(imagere)
              end
            # unless a.include?(x[:word])

            end
          end

          imagere = imagere.resize(0.25)
          imagere.write "result.png"
          file_contents = open("result.png") { |f| f.read }
          b64 = Base64.strict_encode64(file_contents)
          render json: b64

        else
          if screenshot.any?
            render json: screenshot
          else
            render json: {
                     status: 404,
                     error: :not_found,
                     message: "Screenshots with version id #{params[:product_version_id]}  and locale id #{params[:locale_id]} not found",
                   }, status: 404
          end
        end
      end

      def new
        screenshot = Screenshot.new
      end

      def create
        screenshot = Screenshot.new(screenshot_params)
        screenshot.save!
      rescue ActiveRecord::RecordInvalid => invalid
        render json: { errors: invalid.record.errors }
      end

      private

      def screenshot_params
        params.permit(:name, :locale_id, :product_version_id, images: [])
      end

      def product_version
        @version = ProductVersion.find(params[:product_version_id])
      end

      def locale
        @locale = Locale.find(params[:locale_id])
      end
    end
  end
end
