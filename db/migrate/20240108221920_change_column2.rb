class ChangeColumn2 < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :session_token
    add_column :users, :session_token, :string
  end
end
