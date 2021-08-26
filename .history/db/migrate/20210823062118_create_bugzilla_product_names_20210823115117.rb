class CreateBugzillaProductNames < ActiveRecord::Migration[6.0]
  def change
    create_table :bugzilla_product_names do |t|
      t.string :name

      t.timestamps
    end
  end
end
