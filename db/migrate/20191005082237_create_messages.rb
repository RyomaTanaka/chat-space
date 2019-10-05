class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text :text
      t.string :image
      t.integer :user_id, foregin_key: true
      t.integer :group_id, foregin_key: true
      t.timestamps
    end
  end
end
