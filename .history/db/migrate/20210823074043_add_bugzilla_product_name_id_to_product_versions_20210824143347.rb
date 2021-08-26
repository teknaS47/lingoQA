class AddBugzillaProductNameIdToProductVersions < ActiveRecord::Migration[6.0]
  def change
    add_column :product_versions, :bugzilla_product_name_id, :integer
    add_index :product_versions, :bugzilla_product_name_id
    add_foreign_key :product_versions, :bugzilla_product_names, column: :bugzilla_product_name_id
  end
end
