class DropBugzillaProductNames < ActiveRecord::Migration[6.0]
  def change
    drop_table :BugzillaProductNames
  end
end
