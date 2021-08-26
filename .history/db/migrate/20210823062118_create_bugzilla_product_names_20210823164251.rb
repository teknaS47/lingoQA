class CreateBugzillaProductNames < ActiveRecord::Migration[6.0]
  def up
    if table_exists?(:bugzilla_product_names)
      # Some changed if required
    else
      create_table :bugzilla_product_names do |t|
        t.string :name
        t.timestamps
      end
      # create table 
    end
    
  end

  def down
    drop_table :bugzilla_product_names
  end
end
