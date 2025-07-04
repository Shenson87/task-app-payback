def test_create_project(client):
    response = client.post("/projects/", json={
        "title": "Test Project",
        "deadline": "2025-12-31T23:59:59"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Project"
    assert "id" in data


def test_get_projects(client):
    response = client.get("/projects/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1


def test_update_project(client):
    # First download a project
    response = client.get("/projects/")
    assert response.status_code == 200
    data = response.json()[0]
    # Change title of first project and see if it worked
    new_title = 'Changed title'
    data['title'] = new_title
    project_resp = client.put(f'/projects/{data["id"]}', json=data)
    assert project_resp.status_code == 200
    assert project_resp.json()['title'] == new_title


def test_get_tasks_for_project(client):
    # First download a project
    response = client.get("/projects/")
    assert response.status_code == 200
    data = response.json()[0]
    # Try to get tasks for it and see if it worked
    tasks_resp = client.get(f'/projects/{data["id"]}/tasks')
    assert tasks_resp.status_code == 200


def test_delete_project(client):
    # First download a project
    response = client.get("/projects/")
    assert response.status_code == 200
    data = response.json()[0]
    # Try to delete it and see if it worked
    project_resp = client.delete(f'/projects/{data["id"]}')
    assert project_resp.status_code == 200
    assert project_resp.json()['message'] == f"Project {data['id']} deleted"
