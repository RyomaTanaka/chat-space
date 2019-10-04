class CreateUsersGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :users_groups do |t|
      t.string :name, null: false, index: true, uniqe: true
      t.timestamps
    end
  end
end