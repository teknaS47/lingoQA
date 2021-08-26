class AddBugzillaProductNameIdToProductVersions < ActiveRecord::Migration[6.0]
  def change
    add_reference :product_versions, :bugzilla_product_name, foreign_key: true
  end
end
