class CreateUserActivities < ActiveRecord::Migration[6.0]
  def change
    create_table :user_activities do |t|
      t.string :user_id
      t.datetime :login_time
      t.datetime :logout_time

      t.timestamps
    end
  end
end
