class CreateBugzillaProductNames < ActiveRecord::Migration[6.0]
  def up
    create_table :bugzilla_product_names do |t|
      t.string :name
      t.timestamps
    end
  end

  def down
    drop_table :bugzilla_product_names
  end
end
