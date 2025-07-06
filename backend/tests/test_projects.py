import re

def test_create_project(client):
    # First try to create a new project
    response = client.post("/projects/", json={
        "title": "Test Project",
        "deadline": "2025-12-31T23:59:59"
    })
    assert response.status_code == 200
    # Then check if it was created
    data = response.json()
    assert data["title"] == "Test Project"
    assert "id" in data


def test_get_projects(client, create_project):
    # First create a project
    create_project()
    # Download list of projects
    response = client.get("/projects/")
    assert response.status_code == 200
    data = response.json()
    # Check if response is a list
    assert isinstance(data, list)
    assert len(data) >= 1


def test_update_project(client, create_project):
    data = create_project()
    # Change title of project and see if it worked
    new_title = 'Changed title'
    data['title'] = new_title
    project_resp = client.put(f'/projects/{data["id"]}', json=data)
    assert project_resp.status_code == 200
    assert project_resp.json()['title'] == new_title


def test_update_nonexistent_project(client):
    # Try to update a project that does not exist
    project_resp = client.put('/projects/1', json={
        "title": "Test Project",
        "deadline": "2025-12-31T23:59:59"
    })
    assert project_resp.status_code == 404


def test_get_tasks_for_project(client, create_project, create_task):
    project = create_project()
    create_task(project_id=project["id"])
    # Try to get tasks for it and see if it worked
    tasks_resp = client.get(f'/projects/{project["id"]}/tasks')
    assert tasks_resp.status_code == 200
    assert isinstance(tasks_resp.json(), list)


def test_delete_project(client, create_project):
    # First download a project
    project = create_project()
    # Try to delete it and see if it worked
    project_resp = client.delete(f'/projects/{project["id"]}')
    assert project_resp.status_code == 200
    assert re.search(r"deleted", project_resp.json()['message'])


def test_delete_nonexistent_project(client):
    # Try to delete a project that does not exist
    project_resp = client.delete('/projects/1')
    assert project_resp.status_code == 404