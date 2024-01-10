class CreateClaps < ActiveRecord::Migration[7.0]
  def change
    create_table :claps do |t|
      t.integer :user_id, null: false
      t.integer :article_id
      t.integer :comment_id

      t.timestamps
    end
    add_foreign_key :claps, :users, column: :user_id, index: true
    add_foreign_key :claps, :articles, column: :article_id, index: true
    add_foreign_key :claps, :comments, column: :comment_id, index: true
  end
end
