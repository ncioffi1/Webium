class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.integer :following_id
      t.integer :follower_id

      t.timestamps
    end
    add_foreign_key :follows, :users, column: :following_id, index: true
    add_foreign_key :follows, :users, column: :follower_id, index: true
  end
end
