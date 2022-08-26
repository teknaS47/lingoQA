class AlterSomeColumns < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :admin, :boolean, :default => false
    add_index :users, :name, unique: true
  end
end
