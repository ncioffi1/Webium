class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.integer :user_id, null: false
      t.text :comment, null: false
      t.integer :article_id, null: false
      t.integer :parent_comment_id
      t.timestamps
    end
    add_foreign_key :comments, :users, column: :user_id, index: true
    add_foreign_key :comments, :articles, column: :article_id, index: true
  end
end
