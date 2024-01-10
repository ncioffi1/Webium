class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.text :content, null: false
      t.date :date_posted, null: false

      t.timestamps
    end
    add_foreign_key :articles, :users, column: :user_id, index: true
  end
end
